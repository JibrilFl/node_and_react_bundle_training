import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context);

    return (
        <Row className="d-flex">
            {device.brands.map(brand => {
                return (
                    <Card
                        style={{cursor: 'pointer', width: '7rem', alignItems: 'center'}}
                        onClick={() => device.setSelectedBrand(brand)}
                        key={brand.id}
                        className="p-3"
                        border={brand.id === device.selectedBrand.id ? 'success' : 'light'}
                    >
                        {brand.name}
                    </Card>
                )
            })}
        </Row>
    );
});

export default BrandBar;