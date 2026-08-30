const chart = document.getElementById("chart");
const pieChart = echarts.init(chart);
const select = document.getElementById("select");
const priorityDiagram = document.getElementById("priorityChart");
const priority = echarts.init(priorityDiagram);
const dateInput = document.getElementById("dateInput");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const dateChartDom = document.getElementById("dateChart");
const dateChart = echarts.init(dateChartDom);
const STATUS_COLORS = {
    todo: "#686565",
    inProgress: "#f5b301",
    done: "#388e3c",
};
const statusCounts = {
    todo:{
        value:0,
        low:0,
        medium:0,
        high:0,
        
    },
    inProgress:{
        value:0,
        low:0,
        medium:0,
        high:0,
       
    },
    done:{
        value:0,
        low:0,
        medium:0,
        high:0,
       
    },
}

tasks.forEach(task => {
    statusCounts[task.status].value++;
    statusCounts[task.status][task.priority]++;
    

});

dateInput.addEventListener("change", (event) =>{
   const date = dateInput.value;
    const selectedDate = tasks.filter((task) => date === task.timeEnd);

    const dateForPie = {
        todo: 0,
        inProgress: 0,
        done: 0,
    };

    selectedDate.forEach((task) => {
        dateForPie[task.status]++;
    });
    
    const allResults = dateForPie.todo + dateForPie.inProgress + dateForPie.done;

    const dateOption = {
        title: {
            text: `Задачи на ${date}`
        },
        tooltip: {},
        legend: {
            top: 40
        },
        series: [
            {
                type: 'pie',
                top: 60,
                data:allResults === 0 ? [] : [
                    { name: 'To Do', value: dateForPie.todo,itemStyle: { color: STATUS_COLORS.todo } },
                    { name: 'In Progress', value: dateForPie.inProgress,itemStyle: { color: STATUS_COLORS.inProgress } },
                    { name: 'Done', value: dateForPie.done,itemStyle: { color: STATUS_COLORS.done } },
                ],
                emptyCircleStyle: {
                    color: '#010101',
                    borderColor: '#090909',
                    borderWidth: 1,
                },
            }
        ]
    };

    dateChart.setOption(dateOption, true);


});

select.addEventListener("change", (event) =>{

   const selectedStatus = select.value; 
   const data = statusCounts[selectedStatus];  

   const allResults = data.low + data.medium + data.high;
   

    const option = {
        title: {
            text: `Приоритеты: ${selectedStatus}`
        },
        tooltip: {},
        legend: {
            top: 40
        },
        series: [
            {
                type: 'pie',
                top: 60,
                data: allResults === 0 ? [] : [
                    { name: 'Low', value: data.low, itemStyle: { color: STATUS_COLORS.low } },
                    { name: 'Medium', value: data.medium, itemStyle: { color: STATUS_COLORS.medium } },
                    { name: 'High', value: data.high, itemStyle: { color: STATUS_COLORS.high } },
                ],
                emptyCircleStyle: {
                    color: '#030303',
                    borderColor: '#000000',
                    borderWidth: 1,
                },
            }
        ]
    };

    priority.setOption(option, true);

});

const totalTasks = statusCounts.todo.value + statusCounts.inProgress.value + statusCounts.done.value;

const option = {
    title: {
        text: 'Задачи по статусам'
    },
    tooltip: {},
    legend: {},
    series: [
        {
            type: 'pie',
            data: totalTasks === 0 ? [] : [
                { name: 'To Do', value: statusCounts.todo.value, itemStyle: { color: STATUS_COLORS.todo } },
                { name: 'In Progress', value: statusCounts.inProgress.value, itemStyle: { color: STATUS_COLORS.inProgress } },
                { name: 'Done', value: statusCounts.done.value, itemStyle: { color: STATUS_COLORS.done } },
            ],
            emptyCircleStyle: {
                    color: '#070707',
                    borderColor: '#121111',
                    borderWidth: 1,
                },
        }
    ],
};

pieChart.setOption(option, true);