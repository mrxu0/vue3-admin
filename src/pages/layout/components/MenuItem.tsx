import { defineComponent } from "vue";
import { MenuItem } from "ant-design-vue";
import { menusAdmin } from "@/utils/menu";

export default defineComponent({
    setup() {
        return () => (
            <>
            {menusAdmin.map(item => (
                <MenuItem key={item.file}>
                    <item.icon></item.icon>
                    <span>{item.name}</span>
                </MenuItem>
            ))}
            </>
        )
    }
})