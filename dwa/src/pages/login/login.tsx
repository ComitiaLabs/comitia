import {useState, useEffect} from "react";
import {Web5} from "@web5/api";
import type {ProtocolDefinition} from '@tbd54566975/dwn-sdk-js';
import {env} from "../../env.ts"

const Login = () => {
    const [did, setDID] = useState("");
    const [protocolDefinition, setProtocol] = useState<ProtocolDefinition | null>(null);

    useEffect(() => {
        const fetchProtocol = async () => {
            try {
                const response = await fetch(`${env.VITE_WS_URL}/protocols`);
                if (!response.ok) {
                    throw new Error("Failed to fetch protocol");
                }
                const data = await response.json();
                setProtocol(data);
            } catch (error) {
                console.error("Error fetching protocol", error);
            }
        };
        fetchProtocol();
    }, [])
    const getWeb5Instance = async () => {
        const {web5} = await Web5.connect({connectedDid: did});
        if (!web5) {
            throw new Error("Failed to get web5 instance");
        }
        return web5;
    }

    const handleDIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDID(e.target.value);
    }

    async function validateDIDHasProtocol(web5: Web5 | null) {

        if (!web5) {
            throw new Error('Web5 service not initialized');
        }

        try {
            console.log(protocolDefinition?.protocol)
            const response = await web5.dwn.protocols.query({
                message: {
                    filter: {
                        protocol: `${protocolDefinition?.protocol}`
                    }
                }
            });

            return response.protocols.length > 0;
        } catch (error) {
            console.error('DID Protocol Install Validation Error:', error);
            // This is most likely not an internal error, but rather a validation error
            return false;
        }
    }

    const installProtocols = async (web5: Web5, protocolDefinition: ProtocolDefinition) => {
        const hasProtocol = await validateDIDHasProtocol(web5);
        console.log(hasProtocol);
        if (hasProtocol) {
            return
        }
        return await web5.dwn.protocols.configure({
            message: {
                definition: protocolDefinition
            }
        })

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const web5 = await getWeb5Instance();
            console.log(web5);
            console.log("handle submit works")
            if (!protocolDefinition) {
                throw new Error("Could not find protocol definition");
            }
            await installProtocols(web5, protocolDefinition);

        } catch (error) {
            console.error("Could not get web5 instance", error);
            return
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="did">DID:</label>
                <input
                    type="text"
                    id="did"
                    value={did}
                    onChange={handleDIDChange}
                    required
                />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default Login;


//TODO get protocol and save it