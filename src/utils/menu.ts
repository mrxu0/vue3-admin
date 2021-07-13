import { AppstoreAddOutlined, FormOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons-vue';
import { AntdIconProps } from '@ant-design/icons-vue/lib/components/AntdIcon';
import { FunctionalComponent } from 'vue';

export type Menu = {
  name: string;
  path: string;
  folder?: string;
  file?: string;
  icon?: FunctionalComponent<AntdIconProps>;
  children?: Menu[];
}
export const menusAdmin: Menu[] = [
  {
    folder: 'workplace',
    file: 'Workplace',
    path: 'workplace',
    icon: AppstoreAddOutlined,
    name: '工作台',
  },
  {
    folder: 'richText', file: 'RichText', path: 'rich-text', icon: FormOutlined, name: '富文本',
  },
  {
    path: 'digui',
    name: '递归路由',
    icon: VerticalAlignMiddleOutlined,
    children: [
      {
        folder: 'recursive',
        file: 'Recursive1',
        path: 'recursive-1',
        name: '递归-1',
        children: [
          {
            folder: 'recursive',
            file: 'Recursive3',
            path: 'recursive-3',
            name: '递归-3',
          },
        ],
      },
      {
        folder: 'recursive',
        file: 'Recursive2',
        path: 'recursive-2',
        name: '递归-2',
      },
    ],
  },
];
