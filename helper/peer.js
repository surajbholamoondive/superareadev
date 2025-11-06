class PeerService {
    constructor() {
        if (typeof window !== 'undefined' && typeof RTCPeerConnection !== 'undefined') {
            this.peer = new RTCPeerConnection({                
                iceServers: [
                    {
                        urls: [
                            "stun:stun.l.google.com:19302",
                            "stun:global.stun.twilio.com:3478"
                        ]
                    }
                ]
            });
        } 
        else {
            // WebRTC is not supported, log a warning and set peer to null
            console.warn("WebRTC is not supported in this environment. PeerService will not function properly.");
            this.peer = null;
        }
    }

    async sendStream(stream) {
        if (!stream) {
            console.error('No stream available to send.');
            return;
        }

        const peerSenders = this.peer.getSenders();

        stream.getTracks().forEach(track => {
            const existingSender = peerSenders.find(sender => sender && sender.track && sender.track.kind === track.kind);
            if (existingSender) {
                existingSender.replaceTrack(track);
            } else {
                this.peer.addTrack(track, stream);
            }
        });

        console.log('Setting RemoveJoinCallButton to true');
    }

    async getAnswer(offer) {
        if (this.peer) {
            await this.peer.setRemoteDescription(offer);
            const ans = await this.peer.createAnswer();
            await this.peer.setLocalDescription(new RTCSessionDescription(ans));
            return ans;
        }
    }

    async setLocalDescription(ans) {
        if (this.peer) {
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
    }
    
    async getOffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(new RTCSessionDescription(offer));
            return offer;
        }
    }
}

export default new PeerService();



