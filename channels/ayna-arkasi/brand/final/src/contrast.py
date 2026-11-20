"""WCAG 2.x kontrast hesabı: final kimlikte kullanılan her ön plan/zemin çifti."""
def lum(h):
    h=h.lstrip('#'); c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=0.04045 else ((x+0.055)/1.055)**2.4 for x in c]
    return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]
def ratio(a,b):
    la,lb=sorted([lum(a),lum(b)],reverse=True); return (la+0.05)/(lb+0.05)
def over(fg,bg,a):
    f=[int(fg[i:i+2],16) for i in (1,3,5)]; b=[int(bg[i:i+2],16) for i in (1,3,5)]
    return '#'+''.join('%02X'%round(a*x+(1-a)*y) for x,y in zip(f,b))
P=dict(toz='#F2D3D1',keten='#F8F4EC',adacayi='#BCC5B0',murekkep='#2C3A31',koyu='#4D6A55')
if __name__=='__main__':
    for n1,c1 in P.items():
        for n2,c2 in P.items():
            if n1<n2: print(f'{n1:9}{c1} / {n2:9}{c2}  {ratio(c1,c2):5.2f}')
    print('white',{k:round(ratio(v,'#FFFFFF'),2) for k,v in P.items()})
    print('yt-dark',{k:round(ratio(v,'#0F0F0F'),2) for k,v in P.items()})
    for scene in ['#F8F4EC','#F2D3D1','#BCC5B0','#FFFFFF']:
        pill=over('#2C3A31',scene,0.92)
        print('pill over',scene,'=',pill,'keten',round(ratio('#F8F4EC',pill),2),'toz',round(ratio('#F2D3D1',pill),2),'pill/scene',round(ratio(pill,scene),2))
