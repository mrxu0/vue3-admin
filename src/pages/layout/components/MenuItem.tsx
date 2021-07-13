import { defineComponent } from "vue";
import { MenuItem, SubMenu } from "ant-design-vue";
import { menusAdmin, Menu } from "@/utils/menu";

export default defineComponent({

    setup() {
        const recursiveMenus = (menus: Menu[]) => (
            <>
                {menus.map(item => {
                    if (item.children) {
                        return (
                            <SubMenu key={'/admin/' + item.path} icon={
                                item.icon ? <item.icon></item.icon> : ''
                            } title={item.name} >
                                {recursiveMenus(item.children)}
                            </SubMenu>
                        )
                    } else {
                        return (
                            <MenuItem key={'/admin/' + item.path}>
                                {item.icon ? <item.icon></item.icon> : ''}
                                <span>{item.name}</span>
                            </MenuItem>
                        )
                    }
                })}
            </>
        )
        return () => recursiveMenus(menusAdmin)
    }
})