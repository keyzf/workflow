InstanceAttachmentTemplate.helpers = {
    enabled_edit_main_attachment: function() {
        var ins = WorkflowManager.getInstance();
        if (!ins)
            return false

        if (Session && Session.get("instancePrint"))
            return false

        current_step = InstanceManager.getCurrentStep()

        if (current_step && current_step.can_edit_main_attach)
            return true

        return false
    },

    enabled_edit_normal_attachment: function() {
        var ins = WorkflowManager.getInstance();
        if (!ins)
            return false

        if (Session && Session.get("instancePrint"))
            return false

        if (InstanceManager.isCC(ins))
            return false

        if (Session.get("box") == "draft" || Session.get("box") == "inbox")
            return true
        else
            return false
    },



    attachments: function() {
        var instanceId = Session.get('instanceId');
        if (!instanceId)
            return;

        return cfs.instances.find({
            'metadata.instance': instanceId,
            'metadata.current': true
        }).fetch();
    },

    showAttachments: function() {
        var ins = WorkflowManager.getInstance();
        if (!ins)
            return false;

        var instanceId = Session.get('instanceId');
        if (!instanceId)
            return false;


        var attachments = cfs.instances.find({
            'metadata.instance': instanceId,
            'metadata.current': true
        }).fetch();

        if (Session && Session.get("instancePrint") && attachments.length < 1)
            return false

        if (Session.get("box") == "draft" || Session.get("box") == "inbox" || attachments.length > 0)
            return true;
        else
            return false;
    },

    _t: function(key) {
        return TAPi18n.__(key)
    }

}

if (Meteor.isServer) {
    InstanceAttachmentTemplate.helpers._t = function(key) {
        locale = Template.instance().view.template.steedosData.locale
        return TAPi18n.__(key, {}, locale)
    }
    InstanceAttachmentTemplate.helpers.enabled_add_attachment = function() {
        return false
    };

    InstanceAttachmentTemplate.helpers.attachments = function() {
        var instance = Template.instance().view.template.steedosData.instance;
        var attachments = cfs.instances.find({
            'metadata.instance': instance._id,
            'metadata.current': true
        }).fetch();

        return attachments;
    };

    InstanceAttachmentTemplate.helpers.showAttachments = function() {
        var instance = Template.instance().view.template.steedosData.instance;
        var attachments = cfs.instances.find({
            'metadata.instance': instance._id,
            'metadata.current': true
        }).fetch();

        if (attachments && attachments.length > 0) {
            return true;
        }
        return false;
    }
}