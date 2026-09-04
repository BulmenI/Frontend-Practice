import { useState } from "react";
import type { Task } from "../types/types";
import { Input,Select, DatePicker, Button, Form} from "antd";
import '../styles/input.css';
import type { Dayjs } from "dayjs";

type InputProps = {
    onAdd: (task: Task) => void;
};

type FormValues = {
    name: string;
    startTime: Dayjs;
    endTime: Dayjs;
    priority: string;
};



function InputValues({ onAdd }: InputProps) {
    const [priority, setPriority] = useState("low");

    function addTask(values: FormValues) {
        const newTask: Task = {
            id: Date.now(),
            name: values.name,
            startTime: values.startTime.format("YYYY-MM-DDTHH:mm"),
            endTime: values.endTime.format("YYYY-MM-DDTHH:mm"),
            priority: values.priority,
            status: "todo",
        };

        onAdd(newTask);
    }

    return (
        <Form
            layout="vertical"
            onFinish={addTask}
        >
            <Form.Item
                label = "Название задачи"
                name= "name"
                rules={[
                    {
                        required:true,
                        message:"Введите название задачи",
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label = "Начальное время"
                name = "startTime"
            >
                <DatePicker showTime/>
            </Form.Item>
            <Form.Item
                label = "Конечное время"
                name = "endTime"
            >
                <DatePicker showTime/>
            </Form.Item>
            <Form.Item
                label = "Приоритет"
                name = "priority"
                initialValue= "low"
            >
                <Select
                     value={priority}
                     onChange={setPriority}
                     options={[
                         {value:"low", label:"Низкий"},
                         {value:"medium",label:"Средний"},
                         {value:"high",label:"Высокий"},
                     ]}
                />
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
            >
                Добавить задачу
            </Button>
        </Form>
    );
}

export default InputValues;