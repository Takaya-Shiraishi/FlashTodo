import "./App.css"
import { useEffect, useState } from "react";
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

type Task = {
  id: string;
  name: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [allDelete, setAllDelete] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");
  const [editTaskName, setEditTaskName] = useState("");

  // ローカルストレージからタスク一覧を読み込む
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // タスク一覧が変更されるたびにローカルストレージに保存する
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  function handleAllDelete() {
    setAllDelete(false);
  }
  function ExecAllDelete() {
    localStorage.clear();
    setTasks([]);
    setAllDelete(false);
  }

  function handleKeyDown(e: { key: string; }) {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Flash Todo</h1>
          <h6 className="text-center">do now, for the future.</h6>
          <Form className="d-flex flex-row">
            <Form.Control
              type="text"
              placeholder="What are you going to do?"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              onKeyDown={handleKeyDown}
            />&nbsp;
            <Button className="btn-sm text-nowrap" onClick={handleAddTask}>
              追 加
            </Button>
          </Form>
          <br />
          <Table>
            <thead>
              <tr>
                <th className="text-center">タスクタイトル</th>
                <th className="text-center">コントロール</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td valign="middle" className="text-center">{task.name}</td>
                  <td valign="middle" className="text-center">
                    <Button
                      onClick={() => handleEditClick(task.id, task.name)}
                    >
                      編集
                    </Button>
                    &emsp;
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


      <Row>
        <Col>
          {/* ここに他のコンポーネント配置が可能 */}
        </Col>
        <Col xs="auto">
          <Button
            onClick={() => setAllDelete(true)}
            variant="danger"
            className="btn btn-sm"
          >
            全て削除
          </Button>
        </Col>
      </Row>

      <Modal show={allDelete} onHide={handleAllDelete}>
        <div id="delWiz">
          <Modal.Header>
            <Modal.Title>
              全てのタスクを削除しますか？
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={() => setAllDelete(false)}>
              キャンセル
            </Button>
            <Button
              onClick={ExecAllDelete}
              variant="danger"
            >
              削除
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      <Modal show={showEditModal} onHide={handleEditModalCancel}>
        <div id="editWiz">
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
            <Button onClick={handleEditModalSave} variant="success">
              保存
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </Container >
  );
}
export default App;