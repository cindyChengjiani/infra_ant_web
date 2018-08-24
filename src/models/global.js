/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: 全局设置
 */

export default {
    namespace: 'global',

    state: {
        collapsed: false,
        notices: [],
    },
    reducers: {
        changeLayoutCollapsed(state, {payload}) {
            return {
                ...state,
                collapsed: payload,
            };
        }
    }
}