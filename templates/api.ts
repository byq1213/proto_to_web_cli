/*
 * @Description: <%= cn_keyword%> API
 * @Author: <%= git_user%>
 * @Date: <%=time%>
 */

export const <%=keyword%>Api = () => {
    const baseUrl = '<%=base_url%>';
    return {
        <% list.forEach(function(item){ %>
        <%=item.upper_name%>: {
            url: `${baseUrl}/<%=item.name%>`,
            desc: '',
        },
      <% })%>
    };
  };
  
  
  