document.getElementById('roll').addEventListener('click', function() {
    $('.str').val(Math.ceil(Math.random() * 20));
    $('.int').val(Math.ceil(Math.random() * 20));
    $('.dex').val(Math.ceil(Math.random() * 20));
    $('.con').val(Math.ceil(Math.random() * 20));
    $('.cha').val(Math.ceil(Math.random() * 20));
    $('.luc').val(Math.ceil(Math.random() * 20));
});

const fighterMainSkills = ['SLASH', 'SHIELD BASH'];
const mageMainSkills = ['FIRE BALL', 'ICE BLAST'];
const rangerMainSkills = ['BACKSTAB', 'MULTISHOT'];

const fighterSecSkills = ['DEFEND', 'PROVOKE'];
const mageSecSkills = ['DETECT MAGIC', 'HEAL'];
const rangerSecSkills = ['STEAL', 'SNEAK'];

const fighterWeapons = ['SWORD AND SHIELD', 'TWO-HANDED AXE'];
const mageWeapons = ['STAFF', 'WAND'];
const rangerWeapons = ['BOW', 'DAGGERS'];

const fighterArmor = ['PLATE MAIL', 'CHAIN MAIL'];
const mageArmor = ['ROBE', 'CLOAK'];
const rangerArmor = ['LEATHER', 'SCALE'];

let changeOptions = function(element, values) {
        $.each(values, function(index, value) {
            $(element).append($('<option></option>').attr('value', value).text(value));
    })
};

document.getElementById('classDrop').addEventListener('change', function() {
    $('#mainSkillSelect').empty();
    $('#secSkillSelect').empty();
    $('#weaponSelect').empty();
    $('#armorSelect').empty();
    switch($('#classDrop option:selected').val()) {
        case 'FIGHTER' :
            changeOptions($('#mainSkillSelect'), fighterMainSkills);
            changeOptions($('#secSkillSelect'), fighterSecSkills);
            changeOptions($('#weaponSelect'), fighterWeapons);
            changeOptions($('#armorSelect'), fighterArmor);
            break;
        case 'MAGE' :
            changeOptions($('#mainSkillSelect'), mageMainSkills);
            changeOptions($('#secSkillSelect'), mageSecSkills);
            changeOptions($('#weaponSelect'), mageWeapons);
            changeOptions($('#armorSelect'), mageArmor);
            break;
        case 'RANGER' :
            changeOptions($('#mainSkillSelect'), rangerMainSkills);
            changeOptions($('#secSkillSelect'), rangerSecSkills);
            changeOptions($('#weaponSelect'), rangerWeapons);
            changeOptions($('#armorSelect'), rangerArmor);
            break;
    }
})


    
