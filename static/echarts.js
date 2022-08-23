window.addEventListener("load", () => {
    document.querySelectorAll(".shortcodes-echarts").forEach(ch => {
        const chartID = ch.id;
        const chartOption = JSON.parse(ch.innerHTML);


        let myChart = echarts.init(document.getElementById(chartID));
        myChart.setOption(chartOption);
    });
});
