import { useState, Fragment } from 'react';

import Title from '../../component/title';
import Grid from '../../component/grid';
import Box from '../../component/box';

import PostCreate from '../post-create'

import { Alert, Skeleton, LOAD_STATUS } from '../../component/load';

import { getDate } from '../util/getDate';

import PostItem from '../post-item';


export default function Container() {
    const [status, setStatus] = useState(null);
    const [messaeg, setMessage] = useState('');
    const [data, setData] = useState(null);

    const getData = async () => {
        setStatus(LOAD_STATUS.PROGRESS);
        try {
            const res = await fetch("http://localhost:4000/post-list");
            const data = await res.json();

            if(res.ok) {
                setData(convertData(data));
                setStatus(LOAD_STATUS.SUCCESS);
            } else {
                setMessage(data.messaeg);
                setStatus(LOAD_STATUS.ERROR);
            }
        } catch (error) {
            setMessage(error.messaeg)
            setStatus(LOAD_STATUS.ERROR);
        }
    };

    const convertData = (raw) => ({
        list: raw.list.reverse().map(({id,username,text,date}) =>({
            id,
            username,
            text,
            date: getDate(date),
        })),
        isEmpty: raw.list.length === 0,
    });

    if(status === null) {
        getData();
    }

    return(
        <Grid>
            <Box>
                <Grid>
                    <Title>Home</Title>
                    <PostCreate
                    onCreate={getData}
                    placeholder="Whot is happening?!"
                    button="Post"
                    />
                </Grid>
            </Box>

            {status === LOAD_STATUS.PROGRESS && (
                <Fragment>
                    <Box>
                        <Skeleton />
                    </Box>
                    <Box>
                        <Skeleton />
                    </Box>
                </Fragment>
            )}

            {status === LOAD_STATUS.ERROR && (
                <Alert status={status} messaeg={messaeg} />
            )}

            {status === LOAD_STATUS.SUCCESS && (
                <Fragment>
                    {data.isEmpty ? (
                        <Alert messaeg="Список постiв пустий" />
                    ) : (
                        data.list.map((item) => (
                            <Fragment key={item.id}>
                               <PostItem {...item}/>
                                </Fragment>
                        ))
                    )}
                </Fragment>
            )}
        </Grid>
    );
}