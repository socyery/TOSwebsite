//==============================================================
//==============================================================
// WAKE SKILL
//==============================================================
//==============================================================
var HealthAttackRecoveryIncrease = function( MEMBER, place, wakeVar ){
    // wakeVar = "[+health,+attack,+recovery]"
    MEMBER['health']   += eval(wakeVar)[0];
    MEMBER['attack']   += eval(wakeVar)[1];
    MEMBER['recovery'] += eval(wakeVar)[2];
}

var DropIncrease = function( MEMBER, place, wakeVar ){
    // wakeVar = color
    var color = wakeVar;
    if( COLORS.indexOf(color) >= 0 ){
        COLOR_PROB[ place ][ color ] = 0.4;
    }
}

var StraightAttack = function( wakeVar, place, i ){
    // wakeVar = "[factor,straightSize]"
    COUNT_FACTOR['StraightAttack_'+place+'_'+i] = {
        factor    : function( member ){
            return  eval(wakeVar)[0];
        },
        prob      : 1,
        condition : function( member ){
            for( var set of ALL_GROUP_SET_STACK[0]['STRAIGHT_SETS'][place] ){
                if( set.size >= eval(wakeVar)[1] ){
                    return true;
                }
            }
            return false;
        },
    };    
}

var StraightRecover = function( wakeVar, place, i ){
    // wakeVar = "[factor,straightSize]"
    COUNT_RECOVER_FACTOR['StraightRecover_'+place+'_'+i] = {
        factor    : function( member ){
            return  eval(wakeVar)[0];
        },
        prob      : 1,
        condition : function( member ){
            for( var set of ALL_GROUP_SET_STACK[0]['STRAIGHT_SETS'][place] ){
                if( set.size >= eval(wakeVar)[1] ){
                    return true;
                }
            }
            return false;
        },
    };    
}

//==============================================================
//==============================================================
// Wake Database
//==============================================================
//==============================================================
var WAKES_DATA = {
    NONE : {
        id        : "NONE",
    },
    H_A_R_INCREASE : {
        id        : "H_A_R_INCREASE",
        preSet    : HealthAttackRecoveryIncrease,
        // wakeVar = "[+health,+attack,+recovery]"
    },
    DROP_INCREASE : {
        id        : "DROP_INCREASE",
        preSet    : DropIncrease,
        // wakeVar = color
    },
    STRAIGHT_ATTACK : {
        id        : "STRAIGHT_ATTACK",
        attack    : StraightAttack,
        // wakeVar = "[factor,straightSize]"
    },
    STRAIGHT_RECOVER : {
        id        : "STRAIGHT_RECOVER",
        recover   : StraightRecover,
        // wakeVar = "[factor,straightSize]"
    }
}