// WARNING: DONT DELETE THIS, JUST IGNORE!!
// MODEL: HOTTEA WEBUNION
// MIT LICENSE IS ACTIVE FOR THIS JAVASCRIPT CODE
// POWERED BY HOTTEA SECURITY
// THESE COMMENTS ARE NECESSARY FOR ANALYTICS (IF IN THE FUTURE YOU WANT TO CONNECT IT TO YOUR SITE) TO BE ABLE TO IDENTIFY YOUR MODEL.
// DATE OF FIXATION OF THIS MODEL: 17.02.2024 16:08 EUROPE

function getIPAddress() {
  return fetch('https://ipinfo.io/json')
    .then(response => response.json())
    .then(data => data.ip)
    .catch(error => {
      console.error('IP retrieval error:', error);
      return null;
    });
}

function getBlockedIPs() {
    return fetch('https://somebodyscript.github.io/WebUnion/')
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const ulElements = doc.querySelectorAll('ul');
        const ipList = [];
        ulElements.forEach(ul => {
          const ips = ul.textContent.split('\n').map(line => line.trim()).filter(line => line !== '');
          ipList.push(...ips);
        });
        return ipList;
      })
      .catch(error => {
        console.error('Blocked IPs retrieval error:', error);
        return [];
      });
  }

  function checkAndBlock() {
    getIPAddress().then(userIP => {
      getBlockedIPs().then(blockedIPs => {
        if (blockedIPs.includes(userIP)) {
          document.body.innerHTML = '<div class="blocked-page"><h1>Your IP is globally blocked on all WebUnion-using sites, if this is an error, please contact us on our <a href="https://discord.gg/vuD7PN8kR6">Discord server</a></h1></div>';
          applyBlockedPageStyles();
        } else {
          fetch('https://somebodyscript.github.io/WebUnion/')
            .then(response => response.text())
            .then(html => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const ulElements = doc.querySelectorAll('ul');
              ulElements.forEach(ul => {
                console.log('Powered by HotTea')
              });
            })
            .catch(error => console.error('Fetch error:', error));
        }
      });
    });
  }

  function applyBlockedPageStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f1f1f1;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      
      .blocked-page {
        text-align: center;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      
      h1 {
        color: #ff0000;
      }
    `;
    document.head.appendChild(style);
  }

  checkAndBlock();
