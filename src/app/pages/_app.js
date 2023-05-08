import variables from "../styles/variables.module.scss";

export default function MyApp({Component, pageProps}) {
    return (
        <Layout color={variables.primaryColor}>
            <Component {...pageProps} />
        </Layout>
    );
}
