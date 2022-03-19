module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/oren-pesachov-17-3-22/'
    : '/',
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/assets/general.scss";`
            }
        }
    }
}