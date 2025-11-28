import heroImg from "../assets/SoftTulipsCropped4.png";
import { useInvite } from "../context/InviteContext";

export default function Songs() {
  const ceremonyLocation = import.meta.env.VITE_CEREMONY_LOCATION;
  const ceremonyAddress = import.meta.env.VITE_CEREMONY_ADDRESS;
  const ceremonyMapUrl = import.meta.env.VITE_CEREMONY_MAP;
  const receptionLocation = import.meta.env.VITE_RECEPTION_LOCATION;
  const receptionAddress = import.meta.env.VITE_RECEPTION_ADDRESS;
  const receptionMapUrl = import.meta.env.VITE_RECEPTION_MAP;

  const { invite, unauthorized } = useInvite();

  if (unauthorized)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">Unauthorized access</h2>
        </div>
      </div>
    );

  if (!invite)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">Loading invitation...</h2>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-screen w-full text-darkbrown font-body p-6">
      {/* Fixed background image */}
      <div
        className="fixed inset-0 w-full h-full bg-center bg-cover bg-fixed opacity-50 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${heroImg})` }}
      />

      <div className="max-w-4xl mx-auto bg-peach p-6 rounded-lg shadow-md mb-6">
<h1 className="text-3xl font-semibold mb-0 text-center pt-2">Songs</h1>
<img
                    src="/assets/DelineatorLong.png"
                    alt="Leafy line"
                    className="pt-1"
        />
<h1 className="text-3xl font-semibold mb-4 text-center pt-2">Goodness of God</h1>
            <p className="mb-4 text-center">
I love You, Lord<br/>
Oh, Your mercy never fails me<br/>
all my days, I’ve been held in Your hands<br/>
From the moment that I wake up<br/>
Until I lay my head<br/>
Oh, I will sing of the goodness of God<br/>
</p><p className="mb-4 text-center">
All my life You have been faithful<br/>
All my life You have been so, so good<br/>
With every breath that I am able<br/>
Oh, I will sing of the goodness of God<br/>
</p><p className="mb-4 text-center">
I love Your voice<br/>
You have led me through the fire<br/>
In the darkest night You are close like no other<br/>
I’ve known You as a Father<br/>
I’ve known You as a Friend<br/>
And I have lived in the goodness of God<br/>
</p><p className="mb-4 text-center">
All my life You have been faithful<br/>
All my life You have been so, so good<br/>
With every breath that I am able<br/>
Oh, I will sing of the goodness of God<br/>
</p><p className="mb-4 text-center">
Your goodness is running after, it’s running after me<br/>
Your goodness is running after, it’s running after me<br/>
With my life laid down, I’m surrendered now<br/>
I give You everything<br/>
Cause Your goodness is running after, it’s running after me<br/>
</p>

        
        <img
                    src="/assets/DelineatorLong.png"
                    alt="Leafy line"
                    className="pt-8"
        />
            <h1 className="text-3xl font-semibold mb-4 text-center pt-2">How Great Thou Art</h1>
            <p className="mb-4 text-center">
            O Lord my God! When I in awesome wonder<br/>
            Consider all the worlds they hands have made.<br/>
            I see the stars, I hear the rolling thunder<br/>
            thy power throughout the universe displayed<br/>
            </p><p className="mb-4 text-center">
            Then sings my soul, my Saviour God to thee;<br/>
            How great thou art, how great thou art!<br/>
            Then sings my soul, soul, my Saviour God to thee;<br/>
            How great thou art, how great thou art!<br/>
            </p><p className="mb-4 text-center">
            When through the woods and forest glades I wander<br/>
            And hear the birds sing sweetly in the trees;<br/>
            When I look down from lofty mountain grandeur<br/>
            And hear the brook and feel the gentle breeze<br/>
            </p><p className="mb-4 text-center">
            Then sings my soul, my Saviour God to thee;<br/>
            How great thou art, how great thou art!<br/>
            Then sings my soul, soul, my Saviour God to thee;<br/>
            How great thou art, how great thou art!<br/>
            </p><p className="mb-4 text-center">
            And when I think that God, his Son not sparing,<br/>
            Sent him to die, I scarce can take it in;<br/>
            That on the cross, my burden gladly bearing,<br/>
            He bled and died to take away my sin;<br/>
            </p><p className="mb-4 text-center">
            Then sings my soul, my Saviour God to thee;<br/>
            How great thou art, how great thou art!<br/>
            Then sings my soul, soul, my Saviour God to thee;<br/>
            How great thou art, how great thou art!<br/>
            </p><p className="mb-4 text-center">
            When Christ shall come with shout of acclamation<br/>
            And take me home, what joy shall fill my heart!<br/>
            Then I shall bow in humble adoration<br/>
            And there proclaim, my God how great thou art!<br/>
            </p><p className="mb-4 text-center">
            Then sings my soul, my Saviour God to thee;<br/>
            How great thou art, how great thou art!<br/>
            Then sings my soul, soul, my Saviour God to thee;<br/>
            How great thou art, how great thou art!<br/>
            </p>

      </div>
    </div>
  );
}
