export default function calcScore(methods) {
    const values = methods.getValues();
    console.log('Values', values);

    if (values.m01) {
        let s =
            values.m01.size4 === 'yes' &&
            values.m01.twopieces === 'yes' &&
            values.m01.touching &&
            values.m01.touching !== 'none'
                ? 20
                : 0;
        methods.setValue('m01.score', s);
        console.log('Score M01', s);
    }
    if (values.m02) {
        let s = 0;
        let a = [
            ['blue', 20],
            ['yellow', 15],
            ['purple', 10],
        ];
        let i = a.find((i) => i[0] === values.m02.color);
        if (i) s = i[1] as number;
        else s = 0;
        methods.setValue('m02.score', s);
        console.log('Score M02', s);
    }
    if (values.m03) {
        let s = 0;
        let v = values.m03.notOnSlide;
        s += v == '2' ? 20 : v == '1' ? 5 : 0;
        v = values.m03.inHome;
        s += v == '2' ? 10 : v == '1' ? 10 : 0;
        v = values.m03.onTyre;
        s += v == '2' ? 20 : v == '1' ? 20 : 0;
        methods.setValue('m03.score', s);
        console.log('Score M03', s);
    }
    if (values.m04) {
        let s = 0;
        let v = values.m04.benchDown;
        s += v == 'yes' ? 10 : 0;
        if (values.m04.benchDown == 'yes') {
            v = values.m04.cubesInHoles;
            s += v == '4' ? 40 : v == '3' ? 30 : v == '2' ? 20 : v == '1' ? 10 : 0;
        }
        v = values.m04.backRemoved;
        s += v == 'yes' ? 15 : 0;
        methods.setValue('m04.score', s);
        console.log('Score M04', s);
    }
    if (values.m05) {
        let s = 0;
        let v = values.m05.cubeInHoop;
        s += v == 'yes' ? 15 : 0;
        v = values.m05.hoopPosition;
        s += v == 'top' ? 25 : v == 'middle' ? 15 : 0;
        methods.setValue('m05.score', s);
        console.log('Score M05', s);
    }
    if (values.m06) {
        let s = 0;
        let v = values.m06.droveUnder;
        s += v == 'yes' ? 15 : 0;
        v = values.m06.hangingOn;
        s += v == 'yes' ? 30 : 0;
        methods.setValue('m06.score', s);
        console.log('Score M06', s);
    }
    if (values.m07) {
        let s = 0;
        s = values.m07.onPlace == 'yes' && values.m07.isDancing == 'yes' ? 20 : 0;
        methods.setValue('m07.score', s);
        console.log('Score M07', s);
    }
    if (values.m08) {
        let s = 0;
        s += values.m08.cubeOnBothSides == 'yes' && values.m08.cubeSameColor == 'yes' ? 25 : 0;
        let v = values.m08.cubeCount;
        s += v == '7' ? 35 : v == '6' ? 30 : v == '5' ? 25 : 0;
        s += v == '4' ? 20 : v == '3' ? 15 : v == '2' ? 10 : v == '1' ? 5 : 0;
        s += values.m08.yellowCube == 'yes' ? 10 : 0;
        methods.setValue('m08.score', s);
        console.log('Score M08', s);
    }
}
