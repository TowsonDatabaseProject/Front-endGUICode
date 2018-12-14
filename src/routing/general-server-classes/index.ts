import app from './App';

app.listen( (err) => {
    if (err) {
        return console.log(err);
    }

    return console.log('server is listening on ${port}');
});

