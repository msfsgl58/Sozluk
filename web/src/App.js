import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Button,
  Row,
  InputGroup,
  Card,
  ModalHeader,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  useEffect(() => {
    axios
      .get('http://192.168.1.105:3000/all')
      .then((response) => setData(response.data));
  }, []);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [addPanel, setAddPanel] = useState(false);
  const handleAddClose = () => setAddPanel(false);
  const [kelime, setKelime] = useState("");
  const [anlamı, setAnlamı] = useState("");
  const [editPanel, setEditPanel] = useState(false);
  const handleEditClose = () => setEditPanel(false);
  const [editID, setEditID] = useState()
  const [editKelime, setEditKelime] = useState("");
  const [editAnlamı, setEditAnlamı] = useState("");
  const [deletePanel, setDeletePanel] = useState(false);
  const handleDeleteClose = () => setDeletePanel(false);
  const [deleteID, setDeleteID] = useState();
  const [deleteKelime, setDeleteKelime] = useState("");
  const [deleteAnlamı, setDeleteAnlamı] = useState("");

  const sendPost = () => {
    axios
      .post("http://192.168.1.105:3000/newPost", {
        kelime: kelime,
        anlamı: anlamı,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    handleAddClose();
  };

  const deleteFunction = (kelime, anlamı, id) => {
    setDeleteKelime(kelime);
    setDeleteAnlamı(anlamı);
    setDeletePanel(true);
    setDeleteID(id);
  };

  const deletePost = (id) => {
    axios
      .delete(`http://192.168.1.103:3000/deletePost/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    setDeletePanel(false);
  };

  const editFunction = (kelime, anlamı, id) => {
    setEditPanel(!editPanel);
    setEditKelime(kelime);
    setEditAnlamı(anlamı);
    setEditID(id)
  };
  const editPost = (id) => {
    axios
    .put(`http://192.168.1.103:3000/putPost/${id}`,{
      kelime:kelime,
      anlamı:anlamı
    })
    .then((response) => {console.log(response)})
    .catch((err) => {console.log(err)})
    handleEditClose()
  };

  return (
    <div className="App">
       <div className="container">
        <div className="header">
          <div className="search-input">
            <InputGroup className="mb-1">
              <Form.Control
                placeholder="Aramak İstediginiz Kelimeyi Giriniz ..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </InputGroup>
          </div>
          <div className="addButton-div">
            <Button
              variant="dark"
              onClick={() => {
                setAddPanel(!addPanel);
              }}
            >
              Yeni Kelime Ekle
            </Button>
          </div>
        </div>


        {data.length === 0 ?<div className="notDataDiv">
          <p className="notDataP">Veriler Yüklenemedi</p>
        </div> :
          <Row className="g-3">
            {data
              // eslint-disable-next-line array-callback-return
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (item.kelime.toLowerCase().includes(search)) {
                  return item;
                }
              })
              .map((item) => {
                return (
                  <Card
                    className="bg-dark text-white"
                    style={{ width: "18rem", margin: "10px" }}
                  >
                    <Card.Body>
                      <Card.Title>{item.kelime.toUpperCase()}</Card.Title>
                      <Card.Text>{item.anlamı}</Card.Text>
                    </Card.Body>
                    <div className="edit-delete-div">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          editFunction(item.kelime, item.anlamı, item._id)
                        }
                      >
                        DÜZENLE
                      </Button>
                      <Button
                        className="ms-auto"
                        variant="danger"
                        onClick={() =>
                          deleteFunction(item.kelime, item.anlamı, item._id)
                        }
                      >
                        SİL
                      </Button>
                    </div>
                  </Card>
                );
              })}
          </Row>
          }


        <div>
          <Modal show={addPanel} onHide={handleAddClose}>
            <ModalHeader>
              <h3>Yeni Kelime Ekle</h3>
            </ModalHeader>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Kelime</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kelimeyi Giriniz."
                    autoFocus
                    onChange={(e) => setKelime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Anlamı</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Anlamını Giriniz."
                    onChange={(e) => setAnlamı(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleAddClose}>
                İptal
              </Button>
              <Button variant="primary" onClick={() => sendPost()}>
                Kelimeyi Kaydet
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div>
          <Modal show={editPanel} onHide={handleEditClose}>
            <ModalHeader>
              <h3>Kelimeyi Düzenle</h3>
            </ModalHeader>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Kelime</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={editKelime}
                    autoFocus
                    onChange={(e) => setKelime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Anlamı</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder={editAnlamı}
                    onChange={(e) => setAnlamı(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditClose}>
                İptal
              </Button>
              <Button variant="primary" onClick={() => editPost(editID)}>
                Kelimeyi Düzenle
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div>
          <Modal show={deletePanel} onHide={handleDeleteClose}>
            <ModalHeader>
              <h3>Kelimeyi Sil</h3>
            </ModalHeader>
            <Modal.Body>
              <Form>
                <Form.Label>{deleteKelime.toLocaleUpperCase()}</Form.Label>{" "}
                <br />
                <Form.Label>{deleteAnlamı}</Form.Label>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteClose}>
                İptal
              </Button>
              <Button variant="danger" onClick={() => deletePost(deleteID)}>
                Kelimeyi Sil
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
