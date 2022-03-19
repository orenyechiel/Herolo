export default {
    methods: {
        dater(date) {
            const splited = date.split('T');
            return splited[0]
        },
    }
}