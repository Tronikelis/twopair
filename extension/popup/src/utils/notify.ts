import { NotificationProps, notifications } from "@mantine/notifications";

function actions(props: NotificationProps) {
    return notifications.show({ title: "🚀 Actions", ...props });
}

function err(props: NotificationProps) {
    return notifications.show({ title: "⚠️ Error", color: "red", ...props });
}

export default { actions, err };
