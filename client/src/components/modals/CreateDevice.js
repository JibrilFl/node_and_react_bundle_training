import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => {
            device.setTypes(data);
        })
    }, []);

    useEffect(() => {
        fetchBrands().then(data => {
            device.setBrands(data);
        })
    }, []);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(item => item.number === number ? {...item, [key]: value} : item));
    }

    const removeInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', device.selectedBrand.id);
        formData.append('typeId', device.selectedType.id);
        formData.append('info', JSON.stringify(info));

        createDevice(formData).then(data => {
            onHide();
        })
    }

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type => {
                                return (
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedType(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand => {
                                return (
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedBrand(brand)}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введиет название устрйоства"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введиет стоимость устрйоства"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={(e) => selectFile(e)}
                    />
                    <hr/>
                    <Button
                        variant="outline-success"
                        onClick={addInfo}
                    >Добавить новое свойство</Button>
                    {
                        info.map(item => {
                            return (
                                <Row key={item.number} className="mt-3">
                                    <Col md={4}>
                                        <Form.Control
                                            value={item.title}
                                            onChange={(e) => changeInfo('title', e.target.value, item.number)}
                                            placeholder="Введите название свойства"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control
                                            value={item.description}
                                            onChange={(e) => changeInfo('description', e.target.value, item.number)}
                                            placeholder="Введите описание свойства"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Button
                                            variant="outline-danger"
                                            onClick={() => removeInfo(item.number)}
                                        >Удалить</Button>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;