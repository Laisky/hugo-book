window.onload = function () {
    document.querySelectorAll('.shortcodes-gitlab .gitlab-embed-snippets').forEach(async (el) => {
        const codeEle = el.querySelector('pre.shortcodes-gitlab code');
        let gitFileURL = codeEle.innerHTML;
        // console.log(gitFileURL);

        // change filename
        const fileName = /\/blob\/\w+\/([^#\n]+)/.exec(gitFileURL)[1];
        const titleEle = el.querySelector(".gitlab-embedded-snippets-title");
        // console.log(titleEle);
        titleEle.innerHTML = fileName;
        titleEle.setAttribute("href", gitFileURL);

        // fetch and replace code
        let respObj;
        try {
            const resp = await fetch(window.API_GITLAB_CODE + "?file=" + encodeURIComponent(gitFileURL));
            if (resp.status != 200) {
                throw new Error(await resp.text());
            }

            respObj = await resp.json();
            // console.log(respObj);
            codeEle.innerHTML = respObj.content;
        } catch (error) {
            codeEle.innerHTML = "Error: " + error;
            return;
        }


        hljs.highlightElement(codeEle);
        hljs.lineNumbersBlock(codeEle, {
            startFrom: respObj.line_from
        });

        // let lines = /#L(\d)(?:-(\d))?/.exec(gitFileURL);
        // if (lines != null) {
        //     let start = lines[1],
        //         end = lines[2] || start;
        //     // debugger;
        //     hljs.highlightLinesElement(
        //         codeEle,
        //         [{ start: Number(1), end: Number(2), color: 'yello' },]
        //     );
        // }
    });
};
