import React, { PureComponent } from 'react';
import { Grid, Header, Form, Button } from 'semantic-ui-react';

class Settings extends PureComponent {
    render() {
        return (
            <Grid container stackable columns={1} className="single-page">
                <Grid.Column>
                    <Form>
                        <Header as="h1">Настройки</Header>
                        <Header as="h3">Информация аккаунта</Header>
                        <Form.Group widths="equal">
                            <Form.Input label="Никнейм" placeholder="Никнейм" />
                            <Form.Input label="Пароль" placeholder="Пароль" type="password" />
                            <Form.Input label="Новый пароль" placeholder="Новый пароль" type="password" />
                        </Form.Group>
                        <Header as="h3">Общая информация</Header>
                        <Form.Group widths="equal">
                            <Form.Input label="Имя" placeholder="Имя" />
                            <Form.Select
                                label="Пол"
                                placeholder="Пол"
                                options={[
                                    { key: 'male', text: 'Мужской', value: 'male' },
                                    { key: 'female', text: 'Женский', value: 'female' },
                                ]}
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input label="Местоположение" placeholder="Откуда вы?" />
                            <Form.Input label="День рождения" placeholder="Когда вы родились?" type="date" />
                        </Form.Group>
                        <Header as="h3">Другая информация</Header>
                        <Form.TextArea label="О себе" placeholder="Расскажите что нибудь о себе..." />
                        <div style={{ textAlign: 'center' }}>
                            <Button.Group>
                                <Button inverted color="green">Сохранить</Button>
                                <Button.Or text="или" />
                                <Button basic inverted color="red">Отменить</Button>
                            </Button.Group>
                        </div>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Settings;
