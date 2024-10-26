document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bookmarkForm');
  const messageDiv = document.getElementById('message');

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    document.getElementById('name').value = currentTab.title;
    document.getElementById('url').value = currentTab.url;
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const url = document.getElementById('url').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());

    const bookmark = { name, url, tags };

    chrome.storage.sync.get('bookmarks', function(data) {
      const bookmarks = data.bookmarks || [];
      bookmarks.push(bookmark);
      chrome.storage.sync.set({bookmarks: bookmarks}, function() {
        messageDiv.textContent = '书签已保存！';
        form.reset();
      });
    });
  });
});