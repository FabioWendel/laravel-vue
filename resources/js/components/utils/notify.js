import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const notify = (msg, type = 'success') => {
    toast[type](msg, {
        theme: 'colored',
        autoClose: 2000,
    });
};

export { notify };
