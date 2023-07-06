import { NotificationProps, notifications } from "@mantine/notifications";

function actions(props: NotificationProps) {
    return notifications.show({ title: "🚀 Actions", ...props });
}

function err(props: NotificationProps) {
    return notifications.show({ title: "⚠️ Error", color: "red", ...props });
}

function showInjectScriptErr() {
    return err({
        message: "Can't inject the script into this page, are you on a regular website?",
    });
}

export { showInjectScriptErr };
export default { actions, err };
