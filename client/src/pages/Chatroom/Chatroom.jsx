import React, { useEffect, useRef, useState } from "react";
import { FiX, FiMic, FiPhoneOff, FiShare, FiMessageSquare} from "react-icons/fi"
import io from "socket.io-client"
import Peer from "simple-peer";
import styled from "styled-components";

import './chat.css'

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, [props.peer]);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

function Chatroom(props) {

    const [sidebarOpen, setSidebarOpen] = useState(false)


    const openSidebar = () => {
        setSidebarOpen(true)
    }

    const closeSidebar = () => {
        setSidebarOpen(false)
    }

    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, [roomID]);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }
    
    return (
        <>
        <div className="flex h-screen">
        <div onClick={() => closeSidebar()} className={sidebarOpen ? 'block fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden' : 'hidden fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden'}></div>
            <div className={sidebarOpen ? 'translate-x-0 ease-out border-r-2 fixed z-30 inset-y-0 left-0 w-full md:w-96 transition bg-white duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0' : '-translate-x-full ease-in border-r-2 fixed z-30 inset-y-0 left-0 w-full md:w-96 transition bg-white duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0'}>
            <button onClick={() => closeSidebar()} className="absolute top-5 right-5 block md:hidden"><FiX /></button>
                <div className="flex-1 flex flex-col bg-white overflow-hidden h-screen">
                    message
                </div>
            </div>
            <div className="h-screen w-full text-center flex flex-col p-2 justify-between">
            <Container>
                <StyledVideo muted ref={userVideo} autoPlay playsInline />
                    {peers.map((peer, index) => {
                        return (
                            <Video key={index} peer={peer} />
                        );
                    })}
            </Container>
                <div>
                    <div className="p-8">
                        <div className="flex justify-center gap-10">
                            <div className="cursor-pointer bg-yellow-300 p-3 rounded-full" onClick={() => openSidebar()}>
                                <FiMessageSquare  size={35} />
                            </div>
                            <div className="cursor-pointer bg-blue-300 p-3 rounded-full">
                                <FiMic className="" size={35} />
                            </div>
                            <div className="cursor-pointer bg-green-300 p-3 rounded-full">
                                <FiShare size={35} />
                            </div>
                            <div className="cursor-pointer bg-red-300 p-3 rounded-full">
                                <FiPhoneOff size={35} />
                            </div>
                            
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Chatroom
