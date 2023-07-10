export async function checkIfMember(selectedChannel, username) {
    const checkMembershipRequestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            channel_name: selectedChannel,
            username: username,
        }),
    };

    const checkMembershipResponse = await fetch("/messaging/check_if_member", checkMembershipRequestOptions);
    return await checkMembershipResponse.json();
}

export async function fetchMessages(selectedChannel) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            channel_name: selectedChannel,
        }),
    };

    const response = await fetch("/messaging/get_messages", requestOptions);
    return await response.json();
}

export async function sendMessage(selectedChannel, username, message) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username, // Replace with the actual username
            channel_name: selectedChannel,
            message: message,
        }),
    };

    const response = await fetch("/messaging/send_message", requestOptions);
    return await response.json();
}

export async function checkIfAdmin(selectedChannel, username) {
    const checkMembershipRequestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            channel_name: selectedChannel,
            username: username,
        }),
    };
    const checkMembershipResponse = await fetch("/check_if_admin", checkMembershipRequestOptions);
    return await checkMembershipResponse.json();
}

export async function joinChannel(selectedChannel, username) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            channel_name: selectedChannel,
            username: username,
        })
    }
    const response = await fetch("/messaging/add_user_channel", requestOptions);
    return await response.json();
}

// return list of rule name, app name, gt_rule, lt_rule
export async function getChannelApps(selectedChannel) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            channel_name: selectedChannel,
        })
    }
    const response = await fetch("/messaging/get_channel_apps", requestOptions);
    return await response.json();
}

export function filterUserClaimInteger(proofs) {
    const extracted = proofs[0];
    if (extracted['provider'] === "codeforces-rating") {
        return extracted.parameters['rating'];
    }
    return "";
}