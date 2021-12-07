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

@Route('/api/dps/msg')
export default class MsgController extends BaseController {
  @HttpGet('/list')
  public async list() {

  }
}
