const chart = document.getElementById("chart");
const pieChart = echarts.init(chart);
const select = document.getElementById("select");
const priorityDiagram = document.getElementById("priorityChart");
const priority = echarts.init(priorityDiagram);
const dateInput = document.getElementById("dateInput");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const dateChartDom = document.getElementById("dateChart");
const dateChart = echarts.init(dateChartDom);
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
                    { name: 'To Do', value: dateForPie.todo },
                    { name: 'In Progress', value: dateForPie.inProgress },
                    { name: 'Done', value: dateForPie.done },
                ],
                emptyCircleStyle: {
                    color: '#ccc',
                    borderColor: '#ccc',
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
                    { name: 'Low', value: data.low },
                    { name: 'Medium', value: data.medium },
                    { name: 'High', value: data.high },
                ],
                emptyCircleStyle: {
                    color: '#ccc',
                    borderColor: '#ccc',
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
                { name: 'To Do', value: statusCounts.todo.value },
                { name: 'In Progress', value: statusCounts.inProgress.value },
                { name: 'Done', value: statusCounts.done.value },
            ],
            emptyCircleStyle: {
                    color: '#ccc',
                    borderColor: '#ccc',
                    borderWidth: 1,
                },
        }
    ],
};

pieChart.setOption(option, true);