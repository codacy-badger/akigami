import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col, Button } from 'react-bootstrap';


@inject('app')
@observer
export default class Login extends PureComponent {
    render() {
        return (
            <Grid className="opaque">
                <Row>
                    <Col mdOffset={4} md={4}>
                        <div className="auth-card">
                            <h1>Восстановление</h1>
                            <small>воссстановление электронного ящика</small>

                            <p>
                                К сожалению мы не можем восстановить доступ к вашему электронному ящику,
                                так как это ваша собственность и мы ни при каких обстоятельствах не имеем доступа к нему.
                            </p>

                            <Button
                                className="auth-submit"
                                bsStyle="danger"
                                componentClass="a"
                                href="/signin"
                            >
                                Вернуться назад
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
