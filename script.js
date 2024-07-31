var r = document.getElementsByClassName("instagram-anon-view-portal")[0]
if (r) {
    document.body.removeChild(r)
}
const g = document.createElement('a');
g.className = "instagram-anon-view-portal";
document.body.appendChild(g);
g.style.position = 'fixed';
g.style.zIndex = 999;
g.innerText = 'Open Anon Portal';
g.color = 'blue';
g.style.top = 0;
g.style.right = 0;
g.style.marginRight = '20px';
g.style.marginTop = '20px';
var opened = false;
g.onclick = () => {
    
    if (opened) {
        var panel = document.getElementsByClassName('panel-anon')[0];
        document.body.removeChild(panel)
        g.innerText = 'Open Anon Portal';
        opened = false;
    }
    else {
        url = 'https://www.instagram.com/api/v1/direct_v2/inbox/?visual_message_return_type=unseen&thread_message_limit=10&persistentBadging=true&limit=20&is_prefetching=false&fetch_reason=initial_snapshot'
        fetch(url, {
            method: 'GET',
            headers: {
                "sec-fetch-site": "same-origin",
                "x-asbd-id": "129477",
                "x-csrftoken": "D8O5kLvIQcc9VjxM2kOZms5v3CMFpbZs",
                "x-ig-app-id": "936619743392459",
                "x-ig-www-claim": "0",
                "x-instagram-ajax": "1015285776",
                "x-requested-with": "XMLHttpRequest"
            }
        }).then(resp => resp.json()).then(res => {
            opened = true;
            const messages = res['inbox']['threads'];
            const panel = document.createElement('div')
            panel.style.position = 'fixed';
            panel.style.top = '0';
            panel.style.left = '0';
            panel.style.width = '100%'
            panel.style.height = '100vh';
            panel.style.zIndex = '998'
            panel.className = 'panel-anon'
            panel.style.background = 'black'
            g.innerText = 'Close portal';
            for (var i = 0; i < messages.length; i++) {
                console.log(messages[i].direct_story)
                if (messages[i].direct_story != undefined) {
                    var h = document.createElement('p');
                    h.innerHTML = `<strong>${messages[i].users[0].full_name}</strong> sent you a <a target="_blank" href="${messages[i].items[0].raven_media.image_versions2.candidates[0].url}">photo</a><br>`;
                    console.log(h)
                    panel.appendChild(h);
                }
            }
            document.body.appendChild(panel);
        });
    }
    
}

