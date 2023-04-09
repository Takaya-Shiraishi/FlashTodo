import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import { nanoid } from "nanoid";
import "./App.css"

type Task = {
  id: string;
  name: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");
  const [editTaskName, setEditTaskName] = useState("");

  function handleAddTask() {
    if (newTaskName !== "") {
      const newTask: Task = { id: nanoid(), name: newTaskName };
      setTasks([...tasks, newTask]);
      setNewTaskName("");
    }
  }

  function handleDeleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleEditTask(id: string, name: string) {
    setTasks(
      tasks.map((task) => (task.id === id ? { id: id, name: name } : task))
    );
  }

  function handleEditClick(id: string, name: string) {
    setEditTaskId(id);
    setEditTaskName(name);
    setShowEditModal(true);
  }

  function handleEditModalSave() {
    handleEditTask(editTaskId, editTaskName);
    setShowEditModal(false);
  }

  function handleEditModalCancel() {
    setShowEditModal(false);
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Flash Todo</h1>
          <h6>do now, for the future.</h6>
          <Form className="d-flex flex-row">
            <Form.Control
              type="text"
              placeholder="What are you going to do?"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />&nbsp;
            <Button onClick={handleAddTask}>
              追加
            </Button>
          </Form>
          <br />
          <Table>
            <thead>
              <tr>
                <th>タスクタイトル</th>
                <th>コントロール</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td valign="middle">{task.name}</td>
                  <td valign="middle">
                    <Button
                      onClick={() => handleEditClick(task.id, task.name)}
                    >
                      編集
                    </Button>
                    &nbsp;
                    <Button
                      onClick={() => handleDeleteTask(task.id)}
                      variant="danger"
                    >
                      削除
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={showEditModal} onHide={handleEditModalCancel}>
        <Modal.Header>
          <Modal.Title>
            タスクを編集中
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>タスク名を変更できます</Form.Label>
          <Form>
            <Form.Control
              type="text"
              value={editTaskName}
              onChange={(e) => setEditTaskName(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditModalCancel}>
            キャンセル
          </Button>
          <Button onClick={handleEditModalSave}>
            保存
          </Button>
        </Modal.Footer>
      </Modal>
    </Container >
  );
}
export default App;