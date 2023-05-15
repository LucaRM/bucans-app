import variables from "../styles/variables.module.scss";

export default function MyApp({ Component, pageProps }) {
    return (
        <Router>
            <Layout color={variables.primaryColor}>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Layout>
        </Router>
    );
}
