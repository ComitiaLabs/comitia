import { useState, useEffect } from "react";
import { Web5 } from "@web5/";
import type { ProtocolDefinition } from '@tbd54566975/dwn-sdk-js';

const Login = () => {
    const [did, setDID] = useState("");
    const [protocolDefinition, setProtocol] = useState<ProtocolDefinition | null>(null);
    const [web5Instance, setWeb5Instance] = useState(null);

    useEffect(() => {
        const getWeb5Instance = async () => {
            try{
                const { web5 } = await Web5.connect({connectedDID:did});
                if(!web5Instance){
                    throw new Error("Failed to get web5 instance");
                }
                setWeb5Instance(web5);
            } catch(error) {
                console.error("Error getting web5 instance", error)
            }
           
        }
        const fetchProtocol = async () => {
            try {
                const response = await fetch ("https://comitia-help.com/protocol");
                if(!response.ok) {
                    throw new Error("Failed to fetch protocol");
                }
                const data = await response.json();
                setProtocol(data);
            } catch(error) {
                console.error("Error fetching protocol", error);
            }
        };
        fetchProtocol();
        getWeb5Instance();
    }, [])

    const handleDIDChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDID(e.target.value);
    }

    async function validateDIDHasProtocol(did: string, web5:Web5) {
      
        if (!web5) {
          throw new Error('Web5 service not initialized');
        }
      
        console.log('Validating DID has protocol', did);
      
        try {
          const response = await web5.dwn.protocols.query({
            from: did,
            message: {
              filter: {
                protocol: 'https://comitia-help.com/protocol'
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

    const installProtocols = async (web5: Web5, protocolDefinition: ProtocolDefinition | null) => {
        //validate if DID has protocols installed
        // const hasProtocol = await validateDIDHasProtocol(did,web5Instance);
        
        // if(!hasProtocol) {
        //     return 
        // }
        return await web5.dwn.protocols.configure({
            message: {
                definition: protocolDefinition
            }
        })

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        installProtocols(web5Instance, protocolDefinition);


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