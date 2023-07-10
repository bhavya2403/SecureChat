import React, { useEffect, useState } from 'react';
import ReclaimSDK from '@reclaimprotocol/reclaim-client-sdk';
import { filterUserClaimInteger, getChannelApps, joinChannel } from '../functions';

const ChannelJoining = ({ selectedChannel, username, onJoinComplete }) => {
    const [sessionLink, setSessionLink] = useState("");
    const [requiredRules, setRequiredRules] = useState([]);
    const [pageStatus, setPageStatus] = useState("noloading"); // noloading, failed, waiting, loading
    const [totalDoneRules, setTotalDoneRules] = useState(-1);
    const [currentValue, setCurrentValue] = useState(0);
    const [copied, setIsCopied] = useState(false);

    useEffect(() => {
        const firstCall = async () => {
            if (totalDoneRules === -1) return;                           // don't do anything on mount
            if (totalDoneRules === requiredRules.length) {
                await joinChannel(selectedChannel, username);
                onJoinComplete();
                return;
            }
            const reclaimSDK = new ReclaimSDK(requiredRules[totalDoneRules]["app_name"]);
            const session = await reclaimSDK.generateSession(username);
            setSessionLink(session.link);

            try {
                const submissionData = await session?.onSubmission
                if (submissionData?.isProofSubmitted) {
                    const value = filterUserClaimInteger(submissionData.proofs);
                    setCurrentValue(value);
                    if (value > requiredRules[totalDoneRules]["gt_rule"] && value < requiredRules[totalDoneRules]["lt_rule"])
                        setTotalDoneRules((prev) => prev + 1);
                        if (totalDoneRules+1 === requiredRules.length) setPageStatus("done");
                    else
                        setPageStatus("failed");
                }
            } catch (e) {
                alert("Timeout. Refresh the page to again initiate the process")
            }
        }
        firstCall();
    }, [totalDoneRules]);

    const handleJoinChannelClick = async () => {
        const rules =  await getChannelApps(selectedChannel);
        if (rules && !rules.length) setPageStatus("done");
        else setPageStatus("waiting");
        setRequiredRules(rules);                        // list of {rule_name, app_name, gt_rule, lt_rule}
        setTotalDoneRules(0);
        setSessionLink("loading...");
    }
    const handleCopyLink = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(sessionLink)
            .then(() => {
                setIsCopied(true);
            })
            .catch((error) => {
            });
    };

    return (
        <div className="flex h-full col-span-4 justify-center items-center text-center text-2xl">
            {pageStatus === 'noloading' && (
                <div>
                    <h3>You are not yet part of the channel</h3>
                    <button onClick={handleJoinChannelClick} className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-blue-400">Join Channel</button>
                </div>
            )}
            {pageStatus === 'failed' && (
                <div className="channel-joining-status">
                    <div>Your value {currentValue} does not match the criteria of the channel rule</div>
                </div>
            )}
            {pageStatus === 'loading' && (
                <div className="channel-joining-status">
                    <div>Please wait while we load the rules to join the channel</div>
                </div>
            )}
            {pageStatus === 'waiting' && (
                <div className="channel-joining-rules">
                    <h5>
                        You have satisfied <strong>{totalDoneRules}/{requiredRules.length}</strong> rules to join the channel
                    </h5>
                    <div className="p-10 w-1/2 mx-auto">
                        Please complete the following procedure using your phone only. Open the following link in your reclaim
                        wallet. The time limit to complete a single rule is 5 minutes
                    </div>
                    <div className="rule-info">
                        <div><strong>Rule name:</strong> {requiredRules[totalDoneRules]['rule_name']}</div>
                        <div>
                            <strong>Required range:</strong> ({requiredRules[totalDoneRules]['gt_rule']}, {requiredRules[totalDoneRules]['lt_rule']})
                        </div>
                        <div>
                            <strong>Complete link:</strong>
                            <a href={sessionLink} onClick={handleCopyLink} className={`underline ml-2 ${copied? "text-purple-500 hover:text-purple-400": "text-blue-500 hover:text-blue-400"}`}>Copy Link</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChannelJoining;
