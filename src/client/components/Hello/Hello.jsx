import React, { PureComponent } from 'react';
import { Jumbotron } from 'react-bootstrap';

class Hello extends PureComponent {
    render() {
        const { user } = this.props;
        return (
            <Jumbotron className="hello">
                <h4>{`Приветствуем на Акигами, ${user.displayName}!`}</h4>
                <small>Начни свой путь уже сейчас!</small>
                {/* <ol>
                    <li className="completed">
                        <span>
                            <a href="/overview">Добавь</a> или <a href="/settings">импортируй</a> аниме/мангу в свою библиотеку
                        </span>
                    </li>
                    <li>
                        <span>
                            Загляни в свою <a href={user.link}>ленту</a>
                        </span>
                    </li>
                    <li>
                        <span>
                            Оставь хотя бы 1 комментарий к посту
                        </span>
                    </li>
                    <li>
                        <span>
                            Подпишись хотя бы на 3-х пользователей
                        </span>
                    </li>
                    <li>
                        <span>
                            Поставь лайк понравившемуся посту
                        </span>
                    </li>
                </ol> */}
            </Jumbotron>
        );
    }
}

export default Hello;
