import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-bootstrap';
import Wrapper from '../../components/Wrapper';
import {
    Card,
    Submit,
    Help,
    Title,
} from '../Login/Auth.styled';

@inject('app')
@observer
export default class Login extends PureComponent {
    render() {
        return (
            <Wrapper opaque>
                <Grid>
                    <Row>
                        <Col mdOffset={4} md={4}>
                            <Card>
                                <Title>Восстановление</Title>
                                <Help>воссстановление электронного ящика</Help>

                                <p>
                                    К сожалению мы не можем восстановить доступ к вашему электронному ящику,
                                    так как это ваша собственность и мы ни при каких обстоятельствах не имеем доступа к нему.
                                </p>

                                <Submit
                                    bsStyle="danger"
                                    componentClass="a"
                                    href="/signin"
                                >
                                    Вернуться назад
                                </Submit>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
            </Wrapper>
        );
    }
}
