
/**
 * Created by Administrator on 2018/3/24 0024.
 */
$(function(){

    app.confirmDelete();
})
var app={
    toggle:function(el,collectionName,attr,data,id){
        $.get('/admin/changeStatus',{collectionName:collectionName,attr:attr,data:data,id:id},function(data) {
            console.log(data)
            if (data.success) {
                if (el.src.indexOf('yes') != -1) {
                    el.src = '/admin/images/no.gif';
                } else {
                    el.src = '/admin/images/yes.gif';
                }
            }
        })
    },
    confirmDelete(){
        $('.delete').click(function(){
            var flag=confirm('您确定要删除吗?');
            return flag;
        })
    }
}