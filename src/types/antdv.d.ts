declare namespace Antdv {
    type MenuClick = {
        item: {
            disabled: boolean;
            danger:boolean;
            title: string;
            role: string;
            icon: string;

        };
        key: string;
        keyPath: string[];
    }
}
