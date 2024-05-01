import AssessmentCriteria from '../models/assessment-criteria-model.js';
import status from '../json/status.js';
import error from '../json/error.js';

export const getAssessmentCriteria = async (req, res) => {
  try {
    const assessmentCriteria = await AssessmentCriteria.find().where({
      deleted: false,
    });

    if (assessmentCriteria.length === 0) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'Assessment criteria not found' });
    }

    res.status(status.OK).json(assessmentCriteria);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: error.INTERNAL_SERVER_ERROR });
  }
};

export const getAssessmentCriteriaById = async (req, res) => {
  try {
    const assessmentCriteria = await AssessmentCriteria.findById(
      req.params.id
    ).where({
      deleted: false,
    });

    if (!law) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'Assessment criteria not found' });
    }

    res.status(status.OK).json(assessmentCriteria);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: error.INTERNAL_SERVER_ERROR });
  }
};

export const deleteAssessmentCriteria = async (req, res) => {
  try {
    const assessmentCriteria = await AssessmentCriteria.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
      },
      { new: true }
    ).where({ deleted: false });

    if (!assessmentCriteria) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'Assessment criteria not found' });
    }

    res.sendStatus(status.NO_CONTENT);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: error.INTERNAL_SERVER_ERROR });
  }
};

export const putAssessmentCriteria = async (req, res) => {
  try {
    const assessmentCriteria = await AssessmentCriteria.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).where({ deleted: false });

    if (!assessmentCriteria) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'Assessment criteria not found' });
    }

    res.status(status.OK).json(assessmentCriteria);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: error.INTERNAL_SERVER_ERROR });
  }
};

export const postAssessmentCriteria = async (req, res) => {
  try {
    const document = new AssessmentCriteria(req.body);
    const assessmentCriteria = await document.save();

    res.status(status.CREATED).json(assessmentCriteria);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: error.INTERNAL_SERVER_ERROR });
  }
};
