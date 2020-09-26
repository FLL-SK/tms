import { _Inputs } from './_inputs';

export default function calcScore(
    values: _Inputs,
    setMissionScore: (m: string, score: number) => void,
    setMissionError: (path: string, msg?: string) => void,
): number {
    let totalScore = 0;

    if (values.m01) {
        let s =
            values.m01.size4 === 'yes' &&
            values.m01.twopieces === 'yes' &&
            values.m01.touching &&
            values.m01.touching !== 'none'
                ? 20
                : 0;
        setMissionScore('m01', s);
        totalScore += s;
        if (s) console.log('Score M01', s);
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

        setMissionScore('m02', s);
        totalScore += s;
        if (s) console.log('Score M02', s);
    }

    if (values.m03) {
        let s = 0;
        let v = values.m03.notOnSlide;
        s += v == '2' ? 20 : v == '1' ? 5 : 0;
        v = values.m03.inHome;
        s += v == '2' ? 10 : v == '1' ? 10 : 0;
        v = values.m03.onTyre;
        s += v == '2' ? 20 : v == '1' ? 20 : 0;

        setMissionScore('m03', s);
        totalScore += s;
        if (s) console.log('Score M03', s);
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

        totalScore += s;
        setMissionScore('m04', s);
        if (s) console.log('Score M04', s);
    }

    if (values.m05) {
        let s = 0;
        let v = values.m05.cubeInHoop;
        s += v == 'yes' ? 15 : 0;
        v = values.m05.hoopPosition;
        s += v == 'top' ? 25 : v == 'middle' ? 15 : 0;

        totalScore += s;
        setMissionScore('m05', s);
        if (s) console.log('Score M05', s);
    }

    if (values.m06) {
        let s = 0;
        let v = values.m06.droveUnder;
        s += v == 'yes' ? 15 : 0;
        v = values.m06.hangingOn;
        s += v == 'yes' ? 30 : 0;

        totalScore += s;
        setMissionScore('m06', s);
        if (s) console.log('Score M06', s);
    }

    if (values.m07) {
        let s = 0;
        s = values.m07.onPlace == 'yes' && values.m07.isDancing == 'yes' ? 20 : 0;

        totalScore += s;
        setMissionScore('m07', s);
        if (s) console.log('Score M07', s);
    }

    if (values.m08) {
        let s = 0;
        s += values.m08.cubeOnBothSides == 'yes' && values.m08.cubeSameColor == 'yes' ? 25 : 0;
        let v: number = Number(values.m08.cubeCount) || 0;
        s += v * 5;
        s += values.m08.yellowCube == 'yes' ? 10 : 0;

        totalScore += s;
        setMissionScore('m08', s);
        if (s) console.log('Score M08', s);
    }

    if (values.m09) {
        let s = 0;
        let v = values.m09.blueTyreWhite;
        if (v == 'yes') {
            v = values.m09.blueTyrePosition;
            s += v == 'inArea' ? 15 : v == 'onField' ? 10 : 0;
        }

        v = values.m09.blackTyreWhite;
        if (v == 'yes' && values.m09.blackTyreXLine == 'no') {
            v = values.m09.blackTyrePosition;
            s += v == 'inArea' ? 20 : v == 'onField' ? 15 : 0;
        }

        totalScore += s;
        setMissionScore('m09', s);
        if (s) console.log('Score M09', s);
    }

    if (values.m10) {
        let s = 0;
        s = values.m10.onField == 'yes' && values.m10.isFlipped == 'yes' ? 15 : 0;

        totalScore += s;
        setMissionScore('m10', s);
        if (s) console.log('Score M10', s);
    }

    if (values.m11) {
        let s = 0;
        let a = [
            ['gray', 5],
            ['red', 10],
            ['orange', 15],
            ['yellow', 20],
            ['lightGreen', 25],
            ['darkGreen', 30],
        ];
        let i = a.find((i) => i[0] === values.m11.color);
        if (i) s = i[1] as number;
        else s = 0;
        if (values.m11.touchedDial == 'yes') s = 0;

        totalScore += s;
        setMissionScore('m11', s);
        if (s) console.log('Score M11', s);
    }

    if (values.m12) {
        let s = 0;
        let v = values.m12.wheelPosition;
        s = v == 'inSmall' ? 30 : v == 'completelyOut' ? 15 : 0;

        totalScore += s;
        setMissionScore('m12', s);
        if (s) console.log('Score M12', s);
    }

    if (values.m13) {
        let s = 0;
        let a = [
            ['blue', 10],
            ['purple', 15],
            ['yellow', 20],
        ];
        let i = a.find((i) => i[0] === values.m13.color);
        if (i) s = (i[1] as number) * 1;
        else s = 0;
        if (values.m13.latchUnder == 'no') s = 0;

        totalScore += s;
        setMissionScore('m13', s);
        if (s) console.log('Score M13', s);
    }

    if (values.m14) {
        let s = 0;
        let v1 = Number(values.m14.inAreas) || 0; //multiply by 1 to convert string to number
        let v2 = Number(values.m14.onPole) || 0;
        if (v1 + v2 > 8) {
            console.log('M14 Error', v1, v2, (v1 + v2) as number);
            setMissionError('m14.onPole');
        }
        s = v1 * 5 + v2 * 10;

        totalScore += s;
        setMissionScore('m14', s);
        if (s) console.log('Score M14', s);
    }

    if (values.m15) {
        let s = 0;
        let a = [
            ['1', 5],
            ['2', 10],
            ['3', 20],
            ['4', 30],
            ['5', 45],
            ['6', 60],
        ];
        let i = a.find((i) => i[0] === values.m15.count);
        if (i) s = (i[1] as number) * 1;
        else s = 0;

        totalScore += s;
        setMissionScore('m15', s);
        if (s) console.log('Score M15', s);
    }

    console.log('Total score', totalScore);
    return totalScore;
}
