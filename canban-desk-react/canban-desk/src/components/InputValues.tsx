import type { Priority, Task } from "../types/types";
import { Input, Select, DatePicker, Button, Form } from "antd";

import type { Dayjs } from "dayjs";

type InputProps = {
  onAdd: (task: Task) => void;
};

type FormValues = {
  name: string;
  startTime: Dayjs;
  endTime: Dayjs;
  priority: Priority;
};

function InputValues({ onAdd }: InputProps) {
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
    <Form layout="vertical" onFinish={addTask}>
      <Form.Item
        label="Название задачи"
        name="name"
        rules={[
          {
            required: true,
            message: "Введите название задачи",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Начальное время"
        name="startTime"
        rules={[
          {
            required: true,
            message: "Выберите начальную дату",
          },
        ]}
      >
        <DatePicker
          showTime
          style={{ width: "100%" }}
          placeholder="Выберите начальную дату"
        />
      </Form.Item>
      <Form.Item
        label="Конечное время"
        name="endTime"
        rules={[
          {
            required: true,
            message: "Выберите конечную дату",
          },
        ]}
      >
        <DatePicker
          showTime
          style={{ width: "100%" }}
          placeholder="Выберите конечную дату"
        />
      </Form.Item>
      <Form.Item label="Приоритет" name="priority" initialValue="low">
        <Select
          options={[
            { value: "low", label: "Низкий" },
            { value: "medium", label: "Средний" },
            { value: "high", label: "Высокий" },
          ]}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Добавить задачу
      </Button>
    </Form>
  );
}

export default InputValues;
