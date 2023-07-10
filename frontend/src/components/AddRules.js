import { useState } from "react";

const AddRules = ({ selectedChannel }) => {
    const [providerName, setProviderName] = useState("codeforces-rating");
    const [gtRule, setGtRule] = useState(0);
    const [ltRule, setLtRule] = useState(0);
    const [pageStatus, setPageStatus] = useState("noloading");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu visibility

    const handleRuleSubmit = async (event) => {
        event.preventDefault();
        setPageStatus("loading");
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                provider_name: providerName,
                channel_name: selectedChannel,
                gt_rule: gtRule,
                lt_rule: ltRule
            })
        }
        await fetch("/messaging/add_rule", requestOptions).then(() => alert("done"));
        setPageStatus("noloading");
    }

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="absolute right-0 mr-8 mt-5">
            <button className="bg-blue-500 px-4 py-2 rounded-lg" onClick={handleMenuToggle}>
                Add Rule
            </button>
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-400 rounded-lg shadow-lg">
                    {pageStatus === "loading" ? (
                        <div>Please wait while we add the rule...</div>
                    ) : (
                        <form onSubmit={handleRuleSubmit} className="p-4 text-black">
                            <label>Provider Name:
                                <select value={providerName} className="rounded-2xl" onChange={(e) => setProviderName(e.target.value)}>
                                    <option value="codeforces-rating">codeforces-rating</option>
                                </select>
                            </label>
                            <label>Greater than:
                                <input type="number" value={gtRule} className="rounded-2xl" onChange={(e) => setGtRule(parseInt(e.target.value))} />
                            </label>
                            <label>Less than:
                                <input type="number" value={ltRule} className="rounded-2xl" onChange={(e) => setLtRule(parseInt(e.target.value))} />
                            </label>
                            <div className="flex justify-center items-center">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-lg">
                                Add Rule
                            </button>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}

export default AddRules;
