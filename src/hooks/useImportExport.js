import { read, utils, writeFile } from 'xlsx';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const REQUIRED_COLUMNS = ['标签', '网址名称', '网址'];

const validateFileSize = (file) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`文件大小不能超过 ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }
};

const validateFileType = (file) => {
  const validTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'
  ];
  if (!validTypes.includes(file.type)) {
    throw new Error('只支持 Excel 文件格式 (.xlsx, .xls)');
  }
};

const validateColumns = (jsonData) => {
  if (!jsonData || jsonData.length === 0) {
    throw new Error('文件内容为空');
  }

  const firstRow = jsonData[0];
  const missingColumns = REQUIRED_COLUMNS.filter(col => !(col in firstRow));
  
  if (missingColumns.length > 0) {
    throw new Error(`缺少必需的列：${missingColumns.join(', ')}`);
  }
};

const validateBookmarkData = (bookmark) => {
  if (!bookmark.name?.trim()) {
    throw new Error('网址名称不能为空');
  }

  if (!bookmark.url?.trim()) {
    throw new Error('网址不能为空');
  }

  try {
    new URL(bookmark.url);
  } catch {
    throw new Error(`无效的网址：${bookmark.url}`);
  }

  if (!Array.isArray(bookmark.tags)) {
    throw new Error('标签必须是数组格式');
  }
};

const useImportExport = (bookmarks, setBookmarks, tags, updateTags) => {
  const handleExport = () => {
    try {
      const exportData = bookmarks.map(b => ({
        '标签': Array.isArray(b.tags) ? b.tags.join(', ') : '',
        '网址名称': b.name || '',
        '网址': b.url || '',
        '创建时间': b.createdAt ? new Date(b.createdAt).toLocaleString() : new Date().toLocaleString()
      }));

      const ws = utils.json_to_sheet(exportData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Bookmarks");
      writeFile(wb, "bookmarks_export.xlsx");
    } catch (error) {
      console.error('导出失败:', error);
      alert(`导出失败: ${error.message || '请稍后重试'}`);
    }
  };

  const handleImport = async (event) => {
    try {
      if (!event?.target?.files?.[0]) {
        throw new Error('请选择要导入的文件');
      }

      const file = event.target.files[0];
      validateFileSize(file);
      validateFileType(file);
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
          try {
            if (!e.target?.result) {
              throw new Error('文件读取失败');
            }

            const data = new Uint8Array(e.target.result);
            const workbook = read(data, { type: 'array' });
            
            if (!workbook?.SheetNames?.length) {
              throw new Error('Excel 文件格式无效');
            }

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = utils.sheet_to_json(worksheet);

            validateColumns(jsonData);

            const importedBookmarks = jsonData.map((row, index) => {
              try {
                const bookmark = {
                  tags: row['标签'] ? String(row['标签']).split(',').map(tag => tag.trim()).filter(Boolean) : [],
                  name: String(row['网址名称'] || '').trim(),
                  url: String(row['网址'] || '').trim(),
                  clickCount: 0,
                  createdAt: new Date().toISOString(),
                  id: `imported-${Date.now()}-${index}`
                };

                validateBookmarkData(bookmark);
                return bookmark;
              } catch (error) {
                throw new Error(`第 ${index + 2} 行数据无效: ${error.message}`);
              }
            });

            // 过滤重复书签
            const newBookmarks = importedBookmarks.filter(newBookmark => 
              !bookmarks.some(existingBookmark => 
                existingBookmark.name === newBookmark.name &&
                existingBookmark.url === newBookmark.url &&
                JSON.stringify(existingBookmark.tags.sort()) === JSON.stringify(newBookmark.tags.sort())
              )
            );

            if (newBookmarks.length === 0) {
              alert('没有新的书签需要导入');
              resolve(0);
              return;
            }

            setBookmarks(prevBookmarks => [...prevBookmarks, ...newBookmarks]);
            
            const allTags = newBookmarks.flatMap(b => b.tags);
            if (allTags.length > 0) {
              updateTags(allTags);
            }

            alert(`成功导入 ${newBookmarks.length} 个书签`);
            resolve(newBookmarks.length);
          } catch (error) {
            console.error('导入处理失败:', error);
            alert(`导入失败: ${error.message}`);
            reject(error);
          }
        };

        reader.onerror = (error) => {
          console.error('文件读取失败:', error);
          alert('文件读取失败，请重试');
          reject(error);
        };

        try {
          reader.readAsArrayBuffer(file);
        } catch (error) {
          console.error('文件读取失败:', error);
          alert('文件读取失败，请重试');
          reject(error);
        }
      });
    } catch (error) {
      console.error('导入失败:', error);
      alert(`导入失败: ${error.message}`);
      return Promise.reject(error);
    } finally {
      // 重置文件输入
      if (event?.target) {
        event.target.value = '';
      }
    }
  };

  const handleDownloadTemplate = () => {
    try {
      const template = [
        {
          '标签': '示例标签1, 示例标签2',
          '网址名称': '示例网站',
          '网址': 'https://example.com'
        }
      ];

      const ws = utils.json_to_sheet(template);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "导入模板");
      writeFile(wb, "bookmark_import_template.xlsx");
    } catch (error) {
      console.error('模板下载失败:', error);
      alert(`模板下载失败: ${error.message || '请稍后重试'}`);
    }
  };

  return {
    handleExport,
    handleImport,
    handleDownloadTemplate
  };
};

export default useImportExport;