/*
 * @Description: <%= cn_keyword%>
 * @Author: <%= git_user%>
 * @Date: <%=time%>
 */
import { Middleware, Route, HttpGet, HttpPost } from 'egg-decorator-router';
import BaseController from '../base/BaseController';
import middleware from '../middleware';
const authMiddleWare = middleware.smartProxyAuth();

@Middleware(authMiddleWare, 1)

@Route('/api/dps/<%=keyword%>')
export default class <%=upper_keyword%>Controller extends BaseController {

<% list.forEach(function(v){%>
  /** <%=v.name%> */
  @HttpGet('/<%=v.name%>')
  public async <%=v.upper_first_name%>() {
    const { ctx } = this;
    const {
      query,
      request: { body },
      info: { userName },
    } = ctx;
    const { toInt } = ctx.helper;

    const reqUrl = await this.app.apiPool.get('<%=keyword%>/<%=v.upper_name%>');
    const { data: resData } = await this.app.apiMod.postJSON(reqUrl, body || query);
    const { retcode, retmsg, data } = resData;
    ctx.response.std(data, toInt(retcode), retmsg);
  }
<% }) %>
}
