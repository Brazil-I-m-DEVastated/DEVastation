// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
    console.log(err, 'estou aqui');

    console.log(err.errors.status.properties.message);

    if (err.message.includes('|')) {
        const [code, message] = err.message.split('|');
        return res.status(Number(code)).json({ message });
    }

    if (err.errors) {
        const { message } = err.errors.status.properties;
        return res.status(422).json({ message });
    }

    return res.status(500).json({ message: 'Something went wrong' });
};

export default errorHandler;