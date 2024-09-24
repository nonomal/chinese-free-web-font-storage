import { DataNotify } from "."
import { github } from "./GithubNotify"

export const addFontRequest = (props: {
    nickName: string,
    fontName: string
    detail: string
    url: string
}) => {
    const head = [props.nickName, props.fontName].join(' | ')
    return DataNotify({
        title: $t("41b1b235c9136d68808875995ff3fb1c") + props.fontName,
        body: /** @i18n-ignore */`${head} \n${props.detail}`,
        labels: [$t("a771d162e324da353ea1191205a8b2cd")]
    }, github);
}
export const addShowCaseRequest = (props: {
    nickName: string,
    showCaseName: string
    detail: string
    url: string
}) => {
    const head = [props.nickName, props.showCaseName].join(' | ')
    return DataNotify({
        title: $t("57bce51f549734203bf627cda3ed6325") + props.showCaseName,
        body: /** @i18n-ignore */`${head} \n${props.detail}`,
        labels: [$t("7af1be9f649757ba50ca7033c6765e0e")]
    }, github);
}
